import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';

const GRID_LENGTH = 3;
let turn = 'X';

const Game = () => {
  const [grid, setGrid] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const handleOnPress = (colIdx, rowIdx, index) => {
    const value = grid[colIdx][rowIdx];
    if (value !== 0) {
      return;
    }

    let tempArray = grid.slice();
    tempArray[colIdx][rowIdx] = currentPlayer;
    setGrid(tempArray);
    let nextPlayer = currentPlayer === 1 ? 2 : 1;
    setCurrentPlayer(nextPlayer);

    const winner = getWinner();
    if (winner === 1 || winner === 2) {
      Alert.alert('Winner', `Player ${winner} wins the game.`);
      initializeGrid();
    }
  };

  const getWinner = () => {
    let sum = 0;
    for (let i = 0; i < GRID_LENGTH; i++) {
      sum = '' + grid[i][0] + grid[i][1] + grid[i][2];
      if (sum === '111') {
        return 1;
      } else if (sum === '222') {
        return 2;
      }
    }
    for (let i = 0; i < GRID_LENGTH; i++) {
      sum = '' + grid[0][i] + grid[1][i] + grid[2][i];
      if (sum === '111') {
        return 1;
      } else if (sum === '222') {
        return 2;
      }
    }
    sum = '' + grid[0][0] + grid[1][1] + grid[2][2];
    if (sum === '111') {
      return 1;
    } else if (sum === '222') {
      return 2;
    }

    sum = '' + grid[2][0] + grid[1][1] + grid[0][2];
    if (sum === '111') {
      return 1;
    } else if (sum === '222') {
      return 2;
    }

    return 0;
  };

  const initializeGrid = () => {
    const tempGrid = [];
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
      const tempArray = [];
      for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
        tempArray.push(0);
      }
      tempGrid.push(tempArray);
    }
    setGrid(tempGrid);
    setCurrentPlayer(1);
  };

  const getBox = (index, colIdx, rowIdx) => {
    let backgroundColor = 'red';
    const sum = colIdx + rowIdx;
    if (sum % 2 === 0) {
      backgroundColor = 'blue';
    }
    const gridValue = grid[colIdx][rowIdx];
    let content = '-';
    if (gridValue === 1) {
      content = 'X';
    } else if (gridValue === 2) {
      content = 'O';
    }
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleOnPress(colIdx, rowIdx, index)}
        style={{...styles.boxStyle, backgroundColor}}>
        <Text style={styles.contentTextStyle}>{content}</Text>
      </TouchableOpacity>
    );
  };

  const getRow = (row, colIdx) => {
    return row.map((item, index) => {
      return getBox(index, colIdx, index);
    });
  };

  const getColumns = () => {
    return grid.map((row, index) => {
      return (
        <View style={styles.rowStyle} key={index}>
          {getRow(row, index)}
        </View>
      );
    });
  };

  const renderMainGrid = () => {
    return (
      <View style={styles.rootContainerStyle}>
        <View style={styles.columnsStyle}>{getColumns()}</View>
      </View>
    );
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  if (grid.length === 0) {
    return <Text> initializing </Text>;
  }
  return renderMainGrid();
};

const styles = StyleSheet.create({
  columnsStyle: {
    flexDirection: 'column',
  },
  rowStyle: {
    flexDirection: 'row',
    height: 80,
  },
  boxStyle: {
    width: 100,
    height: 100,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rootContainerStyle: {
    flex: 1,
    margin: 40,
  },
  contentTextStyle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
});

export default Game;
