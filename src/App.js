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
    const [binaryString, setBinaryString] = useState([]);
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

    String.prototype.hexDecode = function(){
      var j;
      var hexes = this.match(/.{1,4}/g) || [];
      var back = "";
      for(j = 0; j<hexes.length; j++) {
          back += String.fromCharCode(parseInt(hexes[j], 16));
      }
      return back;
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

    const _c = (event) => {
      if(event.target.value.split(',').length!=8) return;
      let _=[];
      for(let j = 0; j<event.target.value.split(',').length; j++) {
        _.push(zeroPad((event.target.value.split(',')[j] >>> 0).toString(2), 8));
      }
      setBinaryString(_);
      setArray([
      "00000000",
      "00000000",
      "00000000",
      "00000000",
      "00000000",
      "00000000",
      "00000000",
      "00000000"
    ]);
      console.log(_)
    }

    const clearDecode = () => {setBinaryString('');document.getElementById("output").value = "";}

    const zeroPad = (num, places) => String(num).padStart(places, '0');

    return(
      <div style={{paddingLeft: 30}}>
        <h1>{'My Pet Mushroom Map Editor'}</h1>
        {binaryString.length <= 0 ?
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
          :
          <div style={{margin: 30, display: 'flex'}}>
            {[0,1,2,3,4,5,6,7].map((e, index) => (
              <div style={{display: 'block'}}>
                {[0,1,2,3,4,5,6,7].map((e, index2) => (
                  <div style={{border: '1px solid black', height: 30, width:30, margin: 4, backgroundColor: binaryString[index2][index] == 1 ? '#D1D1D1' : 'white'}}>
                  </div>
                ))}
              </div>
            ))}
          </div>
        }

        <div>
          <p>{'Map converted to hex:'} {hexString.slice(0, -1)}</p>
          <p>(Each ith number is binary representation of the row i)</p>
        </div>

        <p><br/>Decode a map here:</p>
        <textarea id='output' onChange={(event) => _c(event)} cols="5" rows="1" style={{resize: 'none', width: 300}}></textarea> 
        <a style={{cursor: 'pointer'}} onClick={clearDecode}><p style={{color: '#d42626', textDecorationLine: 'underline'}}>Clear</p></a>
      </div>
    );
};

export default App;
