use std::fs;
use std::collections::HashMap;

fn main() {
    let raw_input = fs::read_to_string("input.txt").unwrap();
    let input = raw_input.trim();

    let numbers = input.split(",")
        .map(|n| n.parse::<u32>().unwrap());

    let mut turn = 1u32;
    let mut last_used = HashMap::new();
    let mut prev = 0;

    for n in numbers {
        if turn != 1 {
            last_used.insert(prev, turn - 1);
        }
        prev = n;
        turn += 1;
    }

    let res1 = loop {
        let n = match last_used.get(&prev) {
            Some(prev_index) => turn - 1 - *prev_index,
            None => 0
        };

        last_used.insert(prev, turn - 1);
        prev = n;
        turn += 1;

        if turn - 1 == 2020 {
            break n;
        }
    };

    println!("2020-th number is {}", res1);

    let res2 = loop {
        let n = match last_used.get(&prev) {
            Some(prev_index) => turn - 1 - *prev_index,
            None => 0
        };

        if turn == 30000000 {
            break n;
        }

        last_used.insert(prev, turn - 1);
        prev = n;
        turn += 1;
    };

    println!("30000000-th number is {}", res2);
}
