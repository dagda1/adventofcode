module Main where

import           Data.List (group, intercalate, nub, sort)

main :: IO ()
main = do
  file <- "abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab\n"
  let input = lines file
  print (getCheckSum input)
