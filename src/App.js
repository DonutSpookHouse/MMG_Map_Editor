import React, { useContext, useState, useRef, useEffect } from "react";

const App = ({}) => {
    const [array, setArray] = useState([
      "00000000",
      "00000000",
      "00000000",
      "00000000",
      "00000000",
      "00000000",
      "00000000",
      "00000000"
    ]);
    const [hexString, setHexString] = useState('');

    const [refreshKey, setRefreshKey] = useState(0);
    useEffect(() => {
      document.title = 'Map editor';
    }, [array])

    String.prototype.replaceAt = function(index, replacement) {
      return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }

    String.prototype.hexEncode = function(){
        var hex, i;
        var result = "";
        for (i=0; i<this.length; i++) {
            hex = this.charCodeAt(i).toString(16);
            result += ("000"+hex).slice(-4);
        }
        return result
    }

    const _a = (col, row) => {
      var temp = array;
      temp[row] = temp[row].replaceAt(col, temp[row].charAt(col) === '1' ? '0' : '1');
      setArray(temp);
      _b();
    }

    const _b = () => {
      var res = '';
      for(let _=0; _<8;_++) {
        res += parseInt(array[_], 2) + ',';
      }
      setHexString(res);
    }

    return(
      <>
        <h1>{'My Pet Mushroom Map Editor'}</h1>
        <div style={{margin: 30, display: 'flex'}}>
          {[0,1,2,3,4,5,6,7].map((e, index) => (
            <div style={{display: 'block'}}>
              {[0,1,2,3,4,5,6,7].map((e, index2) => (
                <a onClick={() => _a(index, index2)}>
                  <div style={{border: '1px solid black', height: 30, width:30, margin: 4, backgroundColor: array[index2][index] == 1 ? '#D1D1D1' : 'white'}}>
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>

        <div>
          <p>{'Map converted to hex:'} {hexString.slice(0, -1)}</p>
          <p>(Each ith number is binary representation of the row i)</p>
        </div>

      </>
    );
};

export default App;
