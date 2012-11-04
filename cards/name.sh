count=14

for n in {1..52}; do
    suit="none";
    num="$count";
    echo "n: $n"; 

    if [[ $count -eq 14 ]];then
        num="Ace"
    fi
    if [[ $count -eq 13 ]];then
        num="King"
    fi
    if [[ $count -eq 12 ]];then
        num="Queen"
    fi
    if [[ $count -eq 11 ]];then
        num="Jack"
    fi

    if [[ $n%4 -eq 1 ]]; then
        suit="Clubs"
    fi
    if [[ $n%4 -eq 2 ]]; then
        suit="Spades"
    fi
    if [[ $n%4 -eq 3 ]]; then
        suit="Hearts"
    fi
    if [[ $n%4 -eq 0 ]]; then
        suit="Diamonds"
        let 'count-=1'
    fi

    cp "$n.png" "new/$num"_"$suit.png"
done
