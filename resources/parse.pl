#!/usr/bin/perl
# Sven A Robbestad <anders@robbestad.com>
# This script decompresses a Rant vocab file

undef $/;
$n = 0;
use strict;
my $content = <>;    #Whole file content in a single scalar variable
my $out="";
my $outkeywordarray="";
my $group="";
my %collection_keywords;
my @keywords;
my $keyword;
my @collection; push(@collection,'');
my $i=0;
my @nouns;
my $currentOp=0;
my $name; # Name of file

# Get a line count
foreach my $line ( split /\n/, $content ) {
    $i++;
}
my $n=$i; $i=0; # reset counter

foreach my $line ( split /\n/, $content ) {
# remove commented line
    if($line =~ m/\#name/){
    $line =~ s/\#name //;
    $line =~ s/-//g;
    $name = $line;
    # print $name;
    next;
    }

    # remove lines starting with pipe pron (| pron)
       if($line =~ m/\| pron/){
          next;
          }

    # remove lines starting with pipe weight (| pron)
       if($line =~ m/\| weight/){
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
#    $out.="\n";
#    $out .="var ".$name."_".$group." =[";
    $keyword=$group;
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
#    $out =~ s/,+$//m;
#    $out .="];";
#    $out .="\n";

    $currentOp=0;
    next;
}



# remove commented line
    $line =~ s/^[\#]+(.*)//igm;
    $line =~ s/(\#)+(.*)//igm;
    $line =~ s/\|.*//; # remove lines starting with pipe (|)
    $line =~ s/^[> ]*//igm; # remove angle bracket
    $line =~ s/-//igm; # remove dash
    chomp($line); # strip the trailing newline from the line.
    next if ( $line eq "" ); # skip empty lines

    if($keyword eq ''){push(@keywords,''); } else { push(@keywords,$keyword); }

    push(@collection,$line);
    push(@nouns, $line);

}

$out .="\n";

$out .="var dic_".$name."=[";
foreach my $noun (@nouns) {
	$out .= '"'.$noun.'",';
}
$out =~ s/,+$//m;
$out .= "];";

## unique array
my @uniqueKeywords;
foreach my $kw(@keywords) {
    my @kwords = split / /, $kw;
    foreach my $uq(@kwords){
        $uq =~ s/^\s*//; #remove leading whitespace
        $uq =~ s/\s*$//; #remove trailing whitespace
        $uq =~ s/\ {2,}/ /g; #remove multiple literal spaces
        $uq =~ s/\t{2,}/\t/g; #remove excess tabs
        $uq =~ s/(?<=\t)\ *//g; #remove any spaces after a tab
        $uq =~ s/-//g; # remove dash

        push(@uniqueKeywords, $uq);

    }
}

#remove unique
#my %seen=();
#my @unique = grep { ! $seen{$_} ++ } @uniqueKeywords;

## try to group keywords and collection together
my $num=scalar(@keywords);

my @coll;
$i=0;
while($i<$num){
    my @tokens = split / /, @keywords[$i];

foreach my $token(@tokens) {
    $token =~ s/-//igm; # remove dash

    $collection_keywords{"$token"} = $collection_keywords{"$token"}.", \"@collection[$i]\"";
}
$i++;
}

my $array_list="\ndic_$name = dic_$name.concat(";
foreach my $t(keys %collection_keywords){
    $collection_keywords{$t} =~ s/, //s;
    $outkeywordarray.= "\nvar dic_".$name."_$t = [$collection_keywords{$t}];";
    $array_list.="dic_".$name."_$t,"
}
$array_list =~ s/,$//;
$array_list.=");";

## finally, write the files
print "writing ".'out/'.$name.'.js'."\n";
open(O, '>out/'.$name.'.js');
print O $out.$outkeywordarray.$array_list;
close(O);