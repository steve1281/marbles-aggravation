var the_path = [
      { "col":6, "row":13}, //0
      { "col":6, "row":12}, //1
      { "col":6, "row":11}, //2
      { "col":6, "row":10}, //3
      { "col":6, "row":9},  //4
      { "col":6, "row":8},  //5 ** OR { 7, 7}; the hole
      { "col":5, "row":8},  //6
      { "col":4, "row":8},  //7
      { "col":3, "row":8},  //8
      { "col":2, "row":8},  //9
      { "col":1, "row":8},  //10
      { "col":1, "row":7},  //11
      { "col":1, "row":6},  //12 ** enemy start point
      { "col":2, "row":6},  //13
      { "col":3, "row":6},  //14
      { "col":4, "row":6},  //15
      { "col":5, "row":6},  //16
      { "col":6, "row":6},  //17
      { "col":6, "row":5},  //18
      { "col":6, "row":4},  //19
      { "col":6, "row":3},  //20
      { "col":6, "row":2},  //21
      { "col":6, "row":1},  //22
      { "col":7, "row":1},  //23
      { "col":8, "row":1},  //24 ** partner start point
      { "col":8, "row":2},  //25
      { "col":8, "row":3},  //26
      { "col":8, "row":4},  //27
      { "col":8, "row":5},  //28
      { "col":8, "row":6},  //29
      { "col":9, "row":6},  //30
      { "col":10, "row":6},  //31
      { "col":11, "row":6},  //32
      { "col":12, "row":6},  //33
      { "col":13, "row":6},  //34
      { "col":13, "row":7},  //35
      { "col":13, "row":8},  //36 ** enemy start point
      { "col":12, "row":8},  //37
      { "col":11, "row":8},  //38
      { "col":10, "row":8},  //39
      { "col":9, "row":8},  //40
      { "col":8, "row":8},  //41
      { "col":8, "row":9},  //42
      { "col":8, "row":10},  //43
      { "col":8, "row":11},  //44
      { "col":8, "row":12},  //45
      { "col":8, "row":13},  //46
      { "col":7, "row":13},  //47
      { "col":7, "row":12},  //48  ** home/safe/win positions
      { "col":7, "row":11},  //49
      { "col":7, "row":10},  //50
      { "col":7, "row":9},  //51

  ];

  // find pos of marble in the path
  function findPos(pos)
  {
      var x = -1;
      if (pos.col == 7 && pos.row == 7) {
          x = 52; // board center
      } else {
          for (var i=0; i< the_path.length; i++) {
              if ( (the_path[i].col == pos.col) && (the_path[i].row == pos.row) ) {
                  x = i;
                  break;
              }
          }
      }
      return x;
  }

