#!/usr/bin/perl
# Sven A Robbestad <anders@robbestad.com>
# This script fetches all keywords from RantVocabs

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

# subroutine to remove whitespace
sub remove_whitespace{
   $_[0] =~ s/^\s*//;           #remove leading whitespace
   $_[0] =~ s/\s*$//;           #remove trailing whitespace
   $_[0] =~ s/\ {2,}/ /g;       #remove multiple literal spaces
   $_[0] =~ s/\t{2,}/\t/g;      #remove excess tabs
   $_[0] =~ s/(?<=\t)\ *//g;    #remove any spaces after a tab
   chomp($_[0]);
   return $_[0];
}

my $name; my $sub; my $keyword; my @keywords; my $out; my @keyCollection;
$out="var dic={}; var subs={}; var filters={};\n";

foreach my $file (@files) {
    @keywords = ""; # reset keywords
    next if ( $file =~ /^\.$/ ); # skip . and ..
    next if ( $file =~ /^\.git$/ ); # skip .git
    next if ( $file =~ /README+(.*)$/ ); # skip README
    next if ( $file =~ /^\.\.$/ );
    #    $file =~ s/\s/\\ /g; # introduce slashes for spaces
    #    $filename =~ s/\\//g; # remove the slashes again
    my $filename = "$dirname/RantVocab/$file";
    open (FILE, "$filename")
        or die "Could not open file '$filename' $!";

    my $lines = <FILE>;
    foreach my $line ( split /\n/, $lines ) {
    # remove lines starting with pipe pron (| pron)
    if ( $line =~ m/\| pron/ ) {
        next;
    }

    # get name var as #name from file
        if ( $line =~ m/\#name/ ) {
            $line =~ s/\#name //;
            $line =~ s/-'//g;
            $name = $line;
            #$out .= "\nvar valid_keys=[\"".$name."\"]; ";
            push( @keyCollection, $name );
            next;
        }


    # extract subs
        if ( $line =~ m/\#subs/ ) {
            $line =~ s/\#subs //;
            $line =~ s/default//g; # remove 'default'
            $line =~ s/-//g; # remove dash
            $line = remove_whitespace($line);

            if(!$line eq ''){
                $sub = $line;
                my @subwords = split / /, $sub;
                my $iterator = 0;
                if(scalar @subwords > 0){
                $out .= "\nsubs.$name=[";

                foreach my $uniqsub (@subwords) {
                $iterator++;
                $uniqsub = remove_whitespace($uniqsub);
                    $out .= "\"".$uniqsub."\"";
                    if($iterator < scalar @subwords){
                        $out .= ",";
                    }
                }
                $out .= "];";
                }
            }
            next;
        }

    # get keywords starting with pipe
    if ( $line =~ m/\| class/ ) {
        $line =~ s/(\| class)//g;
        $keyword = remove_whitespace($line);
        
        # there can be a lot of keywords. Let's split them up
        my @kwords = split / /, $keyword;
            foreach my $uq (@kwords) {
                $uq = remove_whitespace($uq);
                $uq =~ s/-//g;             # remove dash

                # add them to my list of keywords
                # this is iterating over and over
                # that's okay, because the list is pretty small
                my $exists=0;
                foreach my $kw (@keywords) {
                   if($kw eq $uq) {$exists=1; }
                }
                if($exists == 0){ push( @keywords, $uq );  }
            }
        }
    }


    if(scalar @keywords > 1){
        $out .= "\nfilters.".$name."=[";
        my $iterator = 0;
        foreach my $kw (@keywords) {
            $iterator++;
            if(!$kw eq ""){
                $out .= "\"".$kw."\"";
                if($iterator < scalar @keywords){
                    $out .= ",";
                }

            }
        }
        $out .= "];";
    }
}

$out .= "\nvar valid_keys=[";
my $iterator=0;
foreach my $key(@keyCollection){
$iterator++;
$out .= "\"$key\"";
    if($iterator < scalar @keyCollection){
        $out .= ", ";
    }
}
$out .= "];\n";

print $out;

## finally, write the files
#print "writing $dirname/out/valid_keys.js\n";
#my $file = "$dirname/out/valid_keys.js";
#open(my $fh, '>', $file) or die "Can't write to file '$file' [$!]\n";
#print {$fh} $out;
#close $fh;