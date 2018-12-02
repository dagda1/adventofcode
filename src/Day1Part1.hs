module Main where

import           Data.List.Split

parseString :: Integer -> String -> Integer
parseString acc s =
  let num = read $ tail s :: Integer
      operator = head s
  in if operator == '+'
       then acc + num
       else acc - num

sumInput = foldl parseString 0

main :: IO ()
main = do
  file <- readFile "day1.txt"
  let input = filter (not . null) $ splitOn "\n" file
  print (sumInput input)
