#!/usr/bin/perl
# Sven A Robbestad <anders@robbestad.com>
# This script run convert on all RantVocabs

undef $/;
$n = 0;
use strict;
use warnings;

use File::Basename;
my $dirname = dirname(__FILE__);

my $directory = "$dirname/RantVocab";
opendir( DH, $directory );
my @files = readdir(DH);
closedir(DH);

my $allVars = "";
foreach my $file (@files) {
    next if ( $file =~ /^\.$/ ); # skip . and ..
    next if ( $file =~ /^\.git$/ ); # skip .git
    next if ( $file =~ /^\.gitignore$/ ); # skip .gitignore
    next if ( $file =~ /^\.gitattributes$/ ); # skip .gitattributes
    next if ( $file =~ /README+(.*)$/ ); # skip README
    next if ( $file =~ /^\.\.$/ );
    $file =~ s/\s/\\ /g;
    print `node $dirname/parse.js ./RantVocab/$file `;
}
print `echo "var en_US = function () { "> $dirname/../source/core/en_US.js`;
print `perl $dirname/parseTokens.pl >> $dirname/../source/core/en_US.js`;
print `cat $dirname/../source/dic/custom.js >> $dirname/../source/core/en_US.js`;
print `cat $dirname/out/*.js >> $dirname/../source/core/en_US.js`;
print `echo "return dic; ">> $dirname/../source/core/en_US.js`;
print `echo "}; ">> $dirname/../source/core/en_US.js`;
print `echo "module.exports=en_US; ">> $dirname/../source/core/en_US.js`;

