import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';

export default function ExpenseTest(props) {
  return (
    <View style={styles.tableContainer}>
      <View>
        <Text style={styles.tableHeaders}>Implemented & upcoming features</Text>
        <Text style={styles.tableHeadersPara}>
          Any feature suggestions? Feel free to reach out!
        </Text>
      </View>
      <View>
        <View style={styles.Container}>
          <View style={styles.tableWrapper}>
            <View style={styles.table}>
              <View style={styles.thead}>
                <View style={styles.bodyTr}>
                  <View style={styles.tableTh}>
                    <Text style={styles.tableTitle}>Beta Version</Text>
                  </View>
                  <View style={styles.tableTh}>
                    <Text style={styles.heading}>Implemented</Text>
                    <View style={styles.info}>
                      <Text style={styles.amount}>
                        free <Text>now</Text>
                      </Text>
                      <Text style={styles.billingMessage}>billed annually</Text>
                      <Button
                        style={styles.tableButton}
                        type='button'
                        title='Get started'
                      >
                        Get started
                      </Button>
                    </View>
                  </View>
                  <View style={styles.tableTh}>
                    <Text style={styles.heading}>Upcoming</Text>
                    <View style={styles.info}>
                      {/* <View className='popular'>Popular</View> */}
                      <Text style={styles.amount}>
                        free <Text>soon</Text>
                      </Text>
                      <Text style={styles.billingMessage}>billed annually</Text>
                      <Button type='button' title='Get started'>
                        Get started
                      </Button>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.tBody}>
                <View style={styles.bodyTr}>
                  <Text style={styles.tdHeader}>Trips</Text>
                  <View style={styles.Container}></View>
                  <View></View>
                </View>
                <View style={styles.bodyTr}>
                  <Text style={styles.tableTd}>Create Trips</Text>
                  <View style={styles.tableTd}></View>
                  <View style={styles.tableTd}></View>
                </View>
                <View style={styles.bodyTr}>
                  <Text style={styles.tableTd}>Modify Trips</Text>
                  <View style={styles.tableTd}></View>
                  <View style={styles.tableTd}></View>
                </View>
                <View style={styles.bodyTr}>
                  <Text style={styles.tableTd}>Archive Trips</Text>
                  <View style={styles.tableTd}></View>
                  <View style={styles.tableTd}></View>
                </View>
                <View style={styles.bodyTr}>
                  <Text style={styles.tdHeader}>Trips</Text>
                  <View style={styles.Container}></View>
                  <View style={styles.tableTd}></View>
                </View>
                <View style={styles.bodyTr}>
                  <Text style={styles.tableTd}>Create Activities</Text>
                  <View style={styles.tableTd}></View>
                  <View style={styles.tableTd}></View>
                </View>
                <View style={styles.bodyTr}>
                  <Text style={styles.tableTd}>Modify Activities</Text>
                  <View style={styles.tableTd}></View>
                  <View style={styles.tableTd}></View>
                </View>
                <View style={styles.bodyTr}>
                  <Text style={styles.tableTd}>Archive Activities</Text>
                  <View style={styles.tableTd}></View>
                  <View style={styles.tableTd}></View>
                </View>
                <View style={styles.bodyTr}>
                  <Text style={styles.tdHeader}>Trips</Text>
                  <View style={styles.Container}></View>
                  <View style={styles.tableTd}></View>
                </View>
                <View style={styles.bodyTr}>
                  <Text style={styles.tableTd}>Invite Friends</Text>
                  <View style={styles.tableTd}></View>
                  <View style={styles.tableTd}></View>
                </View>
                <View style={styles.bodyTr}>
                  <Text style={styles.tableTd}>Remove Friend(s)</Text>
                  <View style={styles.tableTd}></View>
                  <View style={styles.tableTd}></View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: { marginBottom: 100 },
  tableHeaders: {
    textAlign: 'center',
    marginTop: 100,
    color: '#b37650',
    fontSize: 60,
    fontWeight: 'bold',
  },

  tableHeadersPara: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 80,

    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // tableButton: {
  //   backgroundColor: 'transparent',
  // },

  table: {
    borderCollapse: 'collapse',
    backgroundColor: 'white',
  },

  container: {
    maxWidth: 850,
    padding: 10,
    margin: 'auto',
  },

  tableWrapper: {
    backgroundColor: 'white',
  },

  table: {
    position: 'relative',
    textAlign: 'center',
    width: '100%',
  },

  thead: {
    backgroundColor: 'white',
    // transition: box-shadow 02s,
  },

  tableTh: {
    minWidth: 150,
  },

  tableTd: {
    minWidth: 150,
  },

  // table th:nth-child(1): {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   fontSize: '1.5rem',
  //   lineHeight: '1.3',
  //   padding: '0 10',
  // },

  // table th:nth-child(1) svg-wrapper: {
  //   marginTop: 10,
  // },

  // table th:nth-child(1) svg: {
  //   width: '22',
  //   height: '22',
  // },

  // table th heading: {
  //   padding: '1rem',
  //   color: 'white',
  // },

  // table th:nth-child(2) heading: {
  //   backgroundColor: '#b37650',
  // },

  // table th:nth-child(3) heading: {
  //   backgroundColor: '#2e5e4e',
  // },

  // table th info: {
  //   position: 'relative',
  //   padding: '1.5rem 0',
  //   // borderLeft: '1 solid' 'whitesmoke',
  // },

  // table th popular: {
  //   position: absolute,
  //   top: 10,
  //   right: 0,
  //   fontSize: 11,
  //   backgroundColor: '#ffdd40',
  //   padding: 4 8,
  //   border-radius: 2,
  // },

  // table th amount: {
  //   fontSize: 2rem,
  // },

  // table th amount span: {
  //   display: block,
  //   transform: translateY(-8),
  // },

  // table th:nth-child(2) amount: {
  //   color: '#b37650',
  // },

  // table th:nth-child(3) amount: {
  //   color: '#2e5e4e',
  // },

  // billingMessage: {
  //   fontSize: '0.8rem',
  // },

  // table th button: {
  //   display: inline-block,
  //   border-radius: 20,
  //   padding: 8 20,
  //   marginTop: 10,
  //   transition: all 0.2s,
  // },

  // table th:nth-child(2) button: {
  //   color: '#b37650',
  //   border: 1 solid '#b37650',
  // },

  // table th:nth-child(2) button:hover: {
  //   backgroundColor: '#b37650',
  // },

  // table th:nth-child(3) button: {
  //   color: '#2e5e4e',
  //   borderColor:  '#2e5e4e',
  //   borderWidth: '1',

  // },

  // table th:nth-child(3) button:hover: {
  //   backgroundColor: '#2e5e4e',
  // },

  // table th button:hover: {
  //   color: 'white',
  // },

  // tableTd: {
  //   padding: 10,
  // },

  // table td:not(:first-child): {
  //   borderLeft: 'whitesmoke',
  //   borderLeftWidth: '1 solid',
  // },

  // table td:first-child: {
  //   textAlign: 'left',
  // },

  // table svg: {
  //   width: '18',
  //   height: '18',
  // },

  // table svgnot-included: {
  //   fill: '#999',
  // },

  // table svgimplemented: {
  //   fill: '#b37650',
  // },

  // table svgupcoming: {
  //   fill: '#2e5e4e',
  // },

  tdHeader: {
    fontWeight: 'bold',
    color: '#b37650',
    fontSize: 20,
  },

  hr: {
    width: 200,
    margin: 'auto',
    borderColor: '#b37650',
    borderWidth: 1,
  },

  tableTitle: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 100,
  },
});
