#!/usr/bin/perl
# Sven A Robbestad <anders@robbestad.com>
# This script decompresses a Rant vocab file

undef $/;
$n = 0;
use strict;
#use warnings;
my $content = <>;    #Whole file content in a single scalar variable

my $out="";
my $wordsout="";
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


#        print($keyword."\n");
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

}

$out .="\n";

$out .="var ".$name."=[";
foreach my $noun (@nouns) {
	$out .= '"'.$noun.'",';
}
$out =~ s/,+$//m;
$out .= "];\n\n";
#print $out;

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
        push(@uniqueKeywords, $uq);
    }
}

my %seen=();
my @unique = grep { ! $seen{$_} ++ } @uniqueKeywords;

foreach my $kw(@unique) {
    if($kw eq ''){ next;}
    $wordsout .= "var verb_".$kw."=[];\n";
#    print "var verb_".$kw."=[];\n";
}



## try to group keywords and collection together
my $num=scalar(@keywords);
my %collection_keywords;
$i=0;
while($i<$num){
my @tokens = split / /, @keywords[$i];

foreach my $token(@tokens) {


    foreach(my $kw(@unique)){
    if($kw == $token)
        %collection_keywords{$kw}[]=$kw;
    }


    $wordsout .= "array_push(verb_".$token.", \"".@collection[$i]."\")\n";
#	print "array_push(verb_".$token.", \"".@collection[$i]."\")\n";
}
$i++;
}



## array_push
my $num=scalar(@keywords);
my @coll;
$i=0;
while($i<$num){
my @tokens = split / /, @keywords[$i];

foreach my $token(@tokens) {
    $wordsout .= "array_push(verb_".$token.", \"".@collection[$i]."\")\n";
#	print "array_push(verb_".$token.", \"".@collection[$i]."\")\n";
}
$i++;
}


## finally, write the files
open(O, '>out/'.$name.'.js');
print O $out.$wordsout;
close(O);
