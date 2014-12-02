#!/usr/bin/perl
# Sven A Robbestad <anders@robbestad.com>
# This script decompresses a Rant vocab file

undef $/;
$n = 0;
use strict;
use warnings;
my $content = <>;    #Whole file content in a single scalar variable

#my $out="{\"nouns\": {";
my $out="";
my $group="";
my $i=0;
my $currentOp=0;
foreach my $line ( split /\n/, $content ) {
    $i++;
}
my $n=$i;
$i=0;
foreach my $line ( split /\n/, $content ) {

# remove commented line
#    $line =~ s/^[\#]+(.*)//igm;
    $line =~ s/(\#name)+(.*)//igm;
    $line =~ s/(\#version)+(.*)//igm;
    $line =~ s/(\#subs)+(.*)//igm;

# remove lines starting with pipe (|)
#    if($line =~ m/\| class/){
#        $group = $line;
#        $group =~ s/(\| class)//g;
#        $group =~ s/\/s//g;
#        $group =~ s/\/s\/s//g;
#        chomp($group);
#        print($group."\n");
#    }


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


    if (! $group eq "" ){
        $out .="\"".$line."\",";
    }

    if(++$i < $n){
    #$out .=",\n";
    }
}
$out =~ s/,+$//m;

$out .="\n\n";
print $out;


#    # finally, write the files
#    open(O, '>dic.js');
#    print O $out;
#    close(O);
