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
#print `rm $dirname/../ext/words.js`;
print `touch $dirname/../ext/words.js`;
print `echo var availableTags=[ > $dirname/../ext/words.js`;

foreach my $file (@files) {
    next if ( $file =~ /^\.$/ ); # skip . and ..
    next if ( $file =~ /^\.git$/ ); # skip .git
    next if ( $file =~ /README+(.*)$/ ); # skip README
    next if ( $file =~ /^\.\.$/ );
    $file =~ s/\s/\\ /g;
    print `node $dirname/searchWords.js ./RantVocab/$file >> $dirname/../ext/words.js`;
}
print `echo ]\\; >> $dirname/../ext/words.js`;

#print `perl $dirname/parseTokens.pl > $dirname/../source/dic/tokens.js`;
#print `cat $dirname/out/*.js > $dirname/../source/dic/dic.js`;
