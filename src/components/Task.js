import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import commonStyles from '../commonStyles';
import moment from 'moment';
import 'moment/locale/pt-br';

export default props => {
  const doneOrNotStyle =
    props.doneAt != null
      ? {
          textDecorationLine: 'line-through',
        }
      : {}; // riscando tarefa concluida
  const dateDone = props.doneAt ? props.doneAt : props.estimatAt;
  const date = moment(dateDone)
    .locale('pt-br')
    .format('ddd, D [de] MMMM');
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
        <View style={styles.checkContainer}>{getCheckView(props.doneAt)}</View>
      </TouchableWithoutFeedback>
      <View>
        <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

function getCheckView(doneAt) {
  if (doneAt != null) {
    // diferente de null
    return (
      <View style={styles.done}>
        <Icon name="check" size={20} color="#FFF" />
      </View>
    );
  } else {
    return <View style={styles.pending} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', //alinhar todos na mesma linha
    borderColor: '#AAA', // cor da borda da linha
    borderBottomWidth: 1, // borda da linha
    alignItems: 'center', // alinhando no centro
    paddingVertical: 10, // Espaçamento entre as linhas
  },
  checkContainer: {
    width: '20%', // largura
    alignItems: 'center',
  },
  pending: {
    height: 25, // altura
    width: 25, // largura
    borderRadius: 13, // bola
    borderWidth: 1,
    borderColor: '#555', // cor cinza
  },
  done: {
    height: 25, // altura
    width: 25, // largura
    borderRadius: 13, // bola
    backgroundColor: '#4D7031', // cor verde escuro
    alignItems: 'center', // alinhamento
    justifyContent: 'center', // alinhamento no centro
  },
  desc: {
    fontFamily: commonStyles.fontFamily, // fonte padrão
    color: commonStyles.colors.mainText, // cor padrão da commonStyles
    fontSize: 15,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12,
  },
});
