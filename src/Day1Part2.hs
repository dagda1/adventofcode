module Main where

import           Data.List.Split
import qualified Data.Set        as Set

parseString :: Integer -> String -> Integer
parseString acc s =
  let num = read $ tail s :: Integer
      operator = head s
  in if operator == '+'
       then acc + num
       else acc - num

findFreq :: Integer
         -> Set.Set Integer
         -> [String]
         -> (Integer, Integer, Set.Set Integer)
findFreq curr acc [] = (0, curr, acc)
findFreq curr acc (x:xs) =
  let next = parseString curr x
  in if Set.member next acc
       then (next, 0, Set.empty)
       else let f = Set.insert next acc
            in findFreq next f xs

findRepeatingFrequency :: Integer -> Set.Set Integer -> [String] -> Integer
findRepeatingFrequency init nums xs =
  let (found, acc, lst) = findFreq init nums xs
  in if found > 0
       then found
       else findRepeatingFrequency acc lst xs

main :: IO ()
main = do
  file <- readFile "day1.txt"
  let input = filter (not . null) $ splitOn "\n" file
  print (findRepeatingFrequency 0 Set.empty input)
