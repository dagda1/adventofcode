module Main where

import           Data.List (group, intercalate, nub, sort)

getOccurrences :: (Integer, Integer) -> [Int] -> (Integer, Integer)
getOccurrences acc xs =
  let twos =
        if 2 `elem` xs
          then 1
          else 0
      threes =
        if 3 `elem` xs
          then 1
          else 0
  in (fst acc + twos, snd acc + threes)

getCheckSum :: [String] -> (Integer, Integer)
getCheckSum boxes =
  let grouped =
        map
          ((\x -> map length x) .
           filter (\x -> length x == 2 || length x == 3) . group . sort)
          boxes
  in foldl getOccurrences (0, 0) grouped

main :: IO ()
main = do
  file <- readFile "day2.txt" -- "abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab\n"
  let input = lines file
  print (getCheckSum input)
