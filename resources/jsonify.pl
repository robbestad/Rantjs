#!/usr/bin/perl
# Sven A Robbestad <anders@robbestad.com>
# This script decompresses a Rant vocab file

undef $/;
$n = 0;
use strict;
use warnings;
my $content = <>;    #Whole file content in a single scalar variable

my $out="var dic=[";
my $i=0;
foreach my $line ( split /\n/, $content ) {
    $i++;
}
my $n=$i;
$i=0;
foreach my $line ( split /\n/, $content ) {

# remove commented line
    $line =~ s/^[\#]+(.*)//igm;

# remove lines starting with pipe (|)
    $line =~ s/\|.*//;

# remove angle bracket
    $line =~ s/^[> ]*//igm;

# strip the trailing newline from the line.
    chomp($line);

# skip empty lines
    next if ( $line eq "" );

    $out.="\"".$line."\"";

    if(++$i < $n){
    $out .=",\n";
    }
}
$out =~ s/,+$//m;

$out .="];";
print $out;


#    # finally, write the files
#    open(O, '>dic.js');
#    print O $out;
#    close(O);
