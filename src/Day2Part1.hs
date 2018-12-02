module Main where

import           Data.List (group, intercalate, nub, sort)

flatten = intercalate []

getCheckSum :: [String] -> Int
getCheckSum boxes =
  let grouped =
        flatten $
        map
          (nub .
           sort .
           map length .
           filter (\x -> length x == 2 || length x == 3) . group . sort)
          boxes
  in let twos = length $ filter (== 2) grouped
         threes = length $ filter (== 3) grouped
     in twos

main :: IO ()
main = do
  let file = "abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab\n"
  let input = lines file
  print (getCheckSum input)
