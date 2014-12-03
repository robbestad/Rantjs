#!/usr/bin/perl
# Sven A Robbestad <anders@robbestad.com>
# Compiles SimpleRant

undef $/;
$n = 0;
use strict;
use warnings;

use File::Basename;
my $dirname = dirname(__FILE__);
my @files;
push(@files,"$dirname/source/arrayMethods.js");
push(@files,"$dirname/dic.js");

my $allVars = "";
foreach my $file (@files) {
    print `ls $file`;
    print `cat $file`."\n";
}
print 'var amount = ["a few", "a bunch of", "some", "many more"];'."\n";
print 'var dic_faced = ["smiled", "frowned", "grimaced", "grinned evilly", "grinned cheekily", "sneered", "puckered", "smirked", "snarled", "snickered", "pouted"];'."\n";

#print `cat $dirname/out/*.js > $dirname/../dic.js`;
