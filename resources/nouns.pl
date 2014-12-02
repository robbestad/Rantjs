#!/usr/bin/perl
# Sven A Robbestad <anders@robbestad.com>
# This script decompresses a Rant vocab file

undef $/;
$n = 0;
use strict;
#use warnings;
my $content = <>;    #Whole file content in a single scalar variable

#my $out="{\"nouns\": {";
my $out="";
my $group="";
my @keywords;
my $keyword;
my @collection;
push(@collection,'');
my $i=0;
my @nouns;
my $currentOp=0;
my $name;
foreach my $line ( split /\n/, $content ) {
    $i++;
}
my $n=$i;
$i=0;
foreach my $line ( split /\n/, $content ) {

# remove commented line
    if($line =~ m/\#name/){
    $line =~ s/\#name //;
    $name = $line;
    #print $name;
    next;
    }

    #$line =~ s/(\#name)+(.*)//igm;
    $line =~ s/(\#version)+(.*)//igm;
    $line =~ s/(\#subs)+(.*)//igm;

    $line =~ s/^\s*//; #remove leading whitespace
    $line =~ s/\s*$//; #remove trailing whitespace
    $line =~ s/\ {2,}/ /g; #remove multiple literal spaces
    $line =~ s/\t{2,}/\t/g; #remove excess tabs
    $line =~ s/(?<=\t)\ *//g; #remove any spaces after a tab

# remove lines starting with pipe (|)
    if($line =~ m/\|/){
        $keyword = $line;
        $keyword =~ s/(\| class)//g;
        $keyword =~ s/^\s*//; #remove leading whitespace
        $keyword =~ s/\s*$//; #remove trailing whitespace
        $keyword =~ s/\ {2,}/ /g; #remove multiple literal spaces
        $keyword =~ s/\t{2,}/\t/g; #remove excess tabs
        $keyword =~ s/(?<=\t)\ *//g; #remove any spaces after a tab
        chomp($keyword);


        print($keyword."\n");
#        exit;
    } else {
       # $keyword='';
    }



# Setter eller fjerner gruppe for alle de kommende ord
if($line =~ m/\#class add/){
    if($currentOp){ next; } # only one op at a time
    $group = $line;
    $group =~ s/(\#class add )//g;
    $group =~ s/^\s*//; #remove leading whitespace
    $group =~ s/\s*$//; #remove trailing whitespace
    $group =~ s/\ {2,}/ /g; #remove multiple literal spaces
    $group =~ s/\t{2,}/\t/g; #remove excess tabs
    $group =~ s/(?<=\t)\ *//g; #remove any spaces after a tab
    #print("adding ".$group." for ".$line."\n");
    $currentOp=1;
    $out.="\n";
    $out .="var ".$group." =[";
    next;
}


if($line =~ m/\#class remove/){
    if($currentOp eq 0){ next; } # prevents a double remove
    $group = $line;
    #print("removing ".$group." for ".$line."\n");

    $group =~ s/(\#class remove)//g;
    $group =~ s/^\s*//; #remove leading whitespace
    $group =~ s/\s*$//; #remove trailing whitespace
    $group =~ s/\ {2,}/ /g; #remove multiple literal spaces
    $group =~ s/\t{2,}/\t/g; #remove excess tabs
    $group =~ s/(?<=\t)\ *//g; #remove any spaces after a tab
    $group="";
    $out =~ s/,+$//m;
    $out .="];";

    #$out =~ s/\]\;+$//m;
    $out .="\n";
    $currentOp=0;
    next;
}



# remove commented line
    $line =~ s/^[\#]+(.*)//igm;
    $line =~ s/(\#)+(.*)//igm;

# remove lines starting with pipe (|)
    $line =~ s/\|.*//;

# remove angle bracket
    $line =~ s/^[> ]*//igm;

# strip the trailing newline from the line.
    chomp($line);

# skip empty lines
    next if ( $line eq "" );


    if($keyword eq ''){
    push(@keywords,'');
        }
    else {
    push(@keywords,$keyword);
    }
    push(@collection,$line);

    if (! $group eq "" ){
        $out .="\"".$line."\",";
    }
    else {
        push(@nouns, $line);
    }

    #if(++$i < $n){
    #   $out .=",\n";
    #}
}

$out .="\n\n";
#print @nouns;

$out .="var ".$name."=[";
foreach my $noun (@nouns) {
	$out .= '"'.$noun.'",';
}
$out =~ s/,+$//m;
$out .= "];\n\n";
print $out;

my $num=scalar(@keywords);
$i=0;
while($i<$num){
print "\n";
print @keywords[$i]."\n";
print @collection[$i]."\n";

$i++;
}
print scalar(@keywords)."\n";
print scalar(@collection)."\n";
$out .="var ".$name."=[";
foreach my $noun (@keywords) {
	$out .= '"'.$noun.'",';
}
$out =~ s/,+$//m;
$out .= "];\n\n";


#
## finally, write the files
open(O, '>out/'.$name.'.js');
print O $out;
close(O);
