#!/bin/sh

if [ "$1" == '--real' ]; then
    aws s3 sync src s3://quint.guvernator.net
else
    printf "Here's what would happen:\n\n"
    aws s3 sync --dryrun src s3://quint.guvernator.net | sed 's/^(dryrun)/ /'
    printf "\nIf that looks okay, rerun with the --real flag.\n"
fi
