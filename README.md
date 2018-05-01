# marbles-aggravation

This is a local take on the game of aggravation; with local rules.
(Mar 31, 2018: just some server side stuff now, more to come)
Most of the server side code will be Java, using grizzly, jackson, and jersey. I use gradle for make-ing.
(Apr 2, 2018: added static httphandler and some html) 

(Apr 5, 2018: moved the tests out of the json folder. The json folder represents the game in startup

## config
* added a marbles.properties file, set PORT and ROOT there.

## build/run
```
./gradlew fatJar
java -jar ./build/libs/marbles-aggravation.jar
```

## Testing backend
```
curl -X GET http://192.168.100.167:9998/board | python -m json.tool
curl -X POST http://localhost:9998/board -H Content-Type:application/json -d @json/set_game_board.json
curl -X GET -L  localhost:9998/message/getmessages | python -m json.tool
```

## Testing website
* http://localhost:9998/game/marbles.html
* http://localhost:9998/game/breakout.html

## Testing game
* launch http://localhost:9998/game/index.html
* launch all four players
* also, the breakout game is still there :-)

