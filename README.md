# marbles-aggravation

This is a local take on the game of aggravation; with local rules.
(Mar 31, 2018: just some server side stuff now, more to come)
Most of the server side code will be Java, using grizzly, jackson, and jersey. I use gradle for make-ing.
(Apr 2, 2018: added static httphandler and some html) 

## build/run
```
./gradlew fatJar
java -jar ./build/libs/marbles-aggravation.jar
```

## Testing
```
curl -X GET http://192.168.100.167:9998/board | python -m json.tool
curl -X POST http://localhost:9998/board -H Content-Type:application/json -d @json/set_game_board.json
```
