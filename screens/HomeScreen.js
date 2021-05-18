import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import dictionary from '../database';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      word: 'loading...',
      definition:'',
      searchText:'',
      isSearchPressed: false,
      isLoading: false,
      lexicalCategory: '',
      displayText: '',
    };
  }

  getWord =(text)=>{
    var text = text.toLowerCase();
    try{
      var word = dictionary[text]['word'];
      var lexicalCategory = dictionary[text]['lexicalCategory'];
      var definition = dictionary[text]['definition'];
      this.setState({
        word: word,
        lexicalCategory: lexicalCategory,
        definition: definition
      })
    }
    catch(err){
      alert("Sorry This Word is Not Available For Now");
      this.setState({
        text:'',
        isSearchPressed: false,
      })
    }
  }


  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            centerComponent={{
              text: 'Pocket Dictionary',
              style: { color: '#fff', fontSize: 20 },
            }}
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word: '',
                lexicalCategory: '',
                examples: [],
                definition: '',
               });
            }}
            value={this.state.text}
          />
          <Text style={styles.displayText}>{this.state.displayText}</Text>
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => {
              this.setState({ 
                isSearchPressed:true,
              });
              this.getWord(this.state.text);
            }}>
            <Text
            style={styles.goText}
            >SEARCH</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.outputContainer}>
          <Text style={{ fontSize: 20 }}>
            {this.state.isSearchPressed && this.state.word === 'Loading...' ? this.state.word : ''}
          </Text>

          {this.state.word !== 'Loading...' ? (
            <View style={{ justifyContent: 'center', marginLeft: 10 }}>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Word : </Text>

                <Text style={{ fontSize: 18 }}>{this.state.word}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Type : </Text>

                <Text style={{ fontSize: 18 }}>
                  {this.state.lexicalCategory}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={styles.detailsTitle}>Definition : </Text>

                <Text style={{ fontSize: 18 }}>{this.state.definition}</Text>
              </View>
            </View>
          ) : null}
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
  },
  goButton: {
    width: '50%',
    height: 50,
    alignSelf: 'center',
    paddingTop:5,
    margin: 10,
    backgroundColor:'white',
    borderRadius:10,
  },
  goText:{
    fontSize:30,
    textAlign:'center',
    fontWeight:'bold',
    alignSelf:'center'
  },
  displayText: {
    textAlign: 'center',
    fontSize: 40,
    backgroundColor: 'teal',
  },
  outputContainer: {
    flex: 0.7,
    alignItems: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsTitle: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
