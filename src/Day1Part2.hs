module Main where

import           Data.List.Split

parseString :: Integer -> String -> Integer
parseString acc s =
  let num = read $ tail s :: Integer
      operator = head s
  in if operator == '+'
       then acc + num
       else acc - num

findFreq :: Integer -> [Integer] -> [String] -> (Integer, Integer, [Integer])
findFreq curr acc [] = (0, curr, acc)
findFreq curr acc (x:xs) =
  let next = parseString curr x
  in if next `elem` acc
       then (next, 0, [])
       else let f = acc ++ [next]
            in findFreq next f xs

findRepeatingFrequency :: Integer -> [Integer] -> [String] -> Integer
findRepeatingFrequency init nums xs =
  let (found, acc, lst) = findFreq init nums xs
  in if found > 0
       then found
       else findRepeatingFrequency acc lst xs

main :: IO ()
main = do
  file <- readFile "input.txt"
  let input = filter (not . null) $ splitOn "\n" file
  print (findRepeatingFrequency 0 [] input)
