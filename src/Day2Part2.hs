module Main where

import           Data.List (intersect, sort)

diffString :: String -> String -> (Integer, Int)
diffString x y =
  foldl
    (\(a, b) z ->
        if x !! b == y !! b
          then (a, b + 1)
          else (a + 1, b + 1))
    (0, 0)
    x

findIt :: [String] -> String
findIt xs =
  let [[left], [right]] =
        filter (not . null) $
        map (\x -> filter (\y -> fst (diffString x y) == 1) xs) xs
  in intersect left right

main :: IO ()
main = do
  file <- readFile "day2.txt"
  let input = lines file
  print (findIt input)
