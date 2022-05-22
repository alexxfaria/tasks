import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeaple from 'react-native-gesture-handler/Swipeable';

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

  const getRightContent = () => {
    return (
      <TouchableOpacity
        style={styles.right}
        onPress={() => props.onDelete && props.onDelete(props.id)}>
        <Icon name="trash" size={30} color="#FFF" />
      </TouchableOpacity>
    );
  };
  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon name="trash" size={20} color="#FFF" style={styles.excludeIcon} />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    );
  };

  return (
    <Swipeaple
      renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
          <View style={styles.checkContainer}>
            {getCheckView(props.doneAt)}
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </Swipeaple>
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
    backgroundColor: '#FFF',
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
  right: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  left: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  excludeText: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
    margin: 10,
  },
  excludeIcon: {
    marginLeft: 10,
  },
});
