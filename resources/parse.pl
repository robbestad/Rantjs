#!/usr/bin/perl
# Sven A Robbestad <anders@robbestad.com>
# This script converts a Rant vocab file to JavaScript lists

undef $/;
$n = 0;
use strict;
my $content         = <>;   
my $out             = "";
my $outkeywordarray = "";
my $group           = "";
my %collection_keywords;
my @keywords;
my $keyword;
my @collection;
push( @collection, '' );
my $i = 0;
my @nouns;
my $currentOp = 0;
my $name;                    # Name of file

use File::Basename;
my $dirname = dirname(__FILE__);

# Get a line count
foreach my $line ( split /\n/, $content ) {
    $i++;
}
my $n = $i;
$i = 0;                      # reset counter

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

#
#$content =~ s/\\n/::/;
#print $content;
#exit;
foreach my $line ( split /\n/, $content ) {

# get #name as name from file
    if ( $line =~ m/\#name/ ) {
        $line =~ s/\#name //;
        $line =~ s/-//g;
        $name = $line;


        if($name eq "with"){
            $name = "preposition";
        }

        if($name eq "name"){
            $name = "firstname";
        }

        next;
    }

    # remove lines starting with pipe pron (| pron)
    if ( $line =~ m/\| pron/ ) {
        next;
    }

    # remove lines starting with pipe weight (| pron)
    if ( $line =~ m/\| weight/ ) {
        next;
    }

    $line =~ s/(\#version)+(.*)//igm;
    $line =~ s/(\#subs)+(.*)//igm;

    $line =~ s/^\s*//;           #remove leading whitespace
    $line =~ s/\s*$//;           #remove trailing whitespace
    $line =~ s/\ {2,}/ /g;       #remove multiple literal spaces
    $line =~ s/\t{2,}/\t/g;      #remove excess tabs
    $line =~ s/(?<=\t)\ *//g;    #remove any spaces after a tab

# get keywords from lines starting with pipe (|)
    if ( $line =~ m/\|/ ) {
        $keyword = $line;
        $keyword =~ s/(\| class)//g;
        $keyword = remove_whitespace($keyword);
    }

# Set or remove group for all the next words
    if ( $line =~ m/\#class add/ ) {
        if ($currentOp) { next; }       # only one op at a time
        $group = $line;
        $group =~ s/(\| class)//g;
        $group =~ s/(\#class add)//g;
        $group =~ s/(\|#)//g;
        $group = remove_whitespace($group);
        $currentOp = 1;
        if(!$group eq ""){
        $keyword = $group;
        }
        next;
    }

    if ( $line =~ m/\#class remove/ ) {
#        if ( $currentOp eq 0 ) { next; }    # prevents a double remove
#        $group = $line;
#        $line =~ s/(\#class remove)//g;
#        $group = remove_whitespace($line);
        $group = "";
        $currentOp = 0;
        next;
    }

# remove commented line
    $line =~ s/^[\#]+(.*)//igm;
    $line =~ s/(\#)+(.*)//igm;
    $line =~ s/\|.*//;         # remove lines starting with pipe (|)
    $line =~ s/^[> ]*//igm;    # remove angle bracket
    $line =~ s/-//igm;         # remove dash
    chomp($line);              # strip the trailing newline from the line.
    next if ( $line eq "" );   # skip empty lines

    #print "$line \n";

    if   ( $keyword eq '' ) { push( @keywords, '' ); }
    else                    { push( @keywords, $keyword ); }

    push( @collection, $line );
    push( @nouns,      $line );

}

## make unique array
my @uniqueKeywords;
foreach my $kw (@keywords) {

    my @kwords = split / /, $kw;
    foreach my $uq (@kwords) {
        $uq = remove_whitespace($uq);
        $uq =~ s/-//g;             # remove dash
        push( @uniqueKeywords, $uq );
    }
}

## try to group keywords and collection together
my $num = scalar(@keywords);

my @coll;
$i = 0;
while ( $i < $num ) {
    my @tokens = split / /, @keywords[$i];

    foreach my $token (@tokens) {
        next if (@collection[$i] eq "");
        $token =~ s/-//igm;    # remove dash
        $collection_keywords{"$token"}
            = $collection_keywords{"$token"} . ", \"@collection[$i]\"";
    }
    $i++;
}

$outkeywordarray = "\nvar $name ={\n";

my $array_list = ".concat(";
print scalar %collection_keywords;
print "\n";
foreach my $t ( keys %collection_keywords ) {
    $collection_keywords{$t} =~ s/, //s;
    $array_list .= $name . ".$t,";
    $outkeywordarray .= "\t$t: [ $collection_keywords{$t}, ],\n";
}


## deduplicate
my @nongrouped;
my $skip = 0;
my $token = 0;
foreach my $noun (@nouns) {
    $skip = 0;
    foreach my $t ( keys %collection_keywords ) {
        my @tokens = split /,/, $collection_keywords{$t};
        foreach my $token (@tokens) {
            $skip = 0;
            $token =~ s/\"//g;
            $token =~ s/,//;
            $token =~ s/\s//;

            if ( $noun == "" ) {
                $skip = 1;
            }


            if ( $noun == $token ) {
                $skip = 1;
            }
        }
    }
    if ( $skip == 0 ) {
        push( @nongrouped, $noun );
    }
}

my $allconcat;
if(scalar @nongrouped > 0){
$allconcat = "\tvar ".$name."_all= [";
foreach my $noun (@nongrouped) {
    $allconcat .= '"' . $noun . '",';
}
$outkeywordarray =~ s/, ],+$/],/m; # remove unnecessary commas
$outkeywordarray =~ s/, ],/],/mg; # remove unnecessary commas
$allconcat .= "]".$array_list.");\n"; # remove unnecessary commas
$outkeywordarray =~ s/,]/]/g; # remove unnecessary commas
}
$outkeywordarray .= "};\n";
$outkeywordarray .= "dic.$name = $name;\n";
$outkeywordarray =~ s/,\)};/\)};/g; # remove unnecessary commas
$outkeywordarray =~ s/,\n}/\n}/g; # remove unnecessary commas
$outkeywordarray =~ s/, ]/]/g; # remove unnecessary commas

$allconcat =~ s/,]/]/g; # remove unnecessary commas
$allconcat =~ s/,\)/\)/g; # remove unnecessary commas

my $out_all;
if(scalar @nongrouped > 0){
    $out_all="dic.".$name.".all=".$name."_all;\n";
} else {
    my $iterator=1;
    foreach my $t ( keys %collection_keywords ) {
        if($iterator == 1 && $iterator == scalar (keys %collection_keywords)){
            $out_all="dic.".$name.".all=dic.".$name.".".$t.";\n";
        }
        elsif($iterator == 1){
            $out_all="dic.".$name.".all=dic.".$name.".".$t.".concat(";
        }
        elsif($iterator == scalar (keys %collection_keywords)){
            $out_all.="dic.".$name.".".$t.");\n";
        } else {
            $out_all.="dic.".$name.".".$t.",";
        }
        $iterator++;
    }

}
#
#print $outkeywordarray;
#print $allconcat;
print $out_all;
#print $array_list;

# finally, write the files
my $file = "$dirname/out/$name.js";
print "writing $file\n";
open(my $fh, '>', $file) or die "Can't write to file '$file' [$!]\n";
#print {$fh}  $out . $outkeywordarray . $array_list;
print {$fh}  $outkeywordarray .$allconcat.$out_all;
close $fh;