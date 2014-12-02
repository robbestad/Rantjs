#!/usr/bin/perl
# Sven A Robbestad <anders@robbestad.com>
# This script converts a Rant vocab file to a javascript var

undef $/;
$n = 0;
use strict;
use warnings;
my $directory = "./RantVocab";
opendir( DH, $directory );
my @files = readdir(DH);
closedir(DH);

my $allVars = "";

foreach my $file (@files) {

    # skip . and .. and .git
    next if ( $file =~ /^\.$/ );
    next if ( $file =~ /^\.git$/ );
    next if ( $file =~ /^\.md$/ );
    next if ( $file =~ /^\.\.$/ );
    open FILE, $directory."/".$file or die $!;
    my $content = <FILE>;

    my $fname = $file;

    # lowercase
    $fname =~ tr/A-Z/a-z/;

    # remove .dic
    $fname =~ s/\.dic//;

    #replace whitespace with underscore
    $fname =~ s/\s/_/g;

    my $out = "var " . $fname . "=[";
    my $i   = 0;
    foreach my $line ( split /\n/, $content ) {
        $i++;
    }
    my $n = $i;
    $i = 0;
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

        $out .= "\"" . $line . "\"";

        if ( ++$i < $n ) {
            $out .= ",";
        }
    }
    $out =~ s/,+$//m;

    $out .= "];";
    $allVars .= $out . "\n";

    # Write the files
    open( O, '> js/' . $file . '.js' );
    print O $out;
    close(O);

}

# finally, write the files
open( O, '> all.dic.js' );
print O $allVars;
close(O);

