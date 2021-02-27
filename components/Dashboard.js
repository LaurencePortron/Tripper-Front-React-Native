import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import API from '../services/API';
import moment from 'moment';
import { PlusCircle, Info } from 'react-feather';

export default function Dashboard(props) {
  const [tab, setTab] = useState('active');
  const [fetchTrips, setFetchTrips] = useState([]);
  const history = useHistory();

  useEffect(() => {
    API.get(`/trips`).then((res) => {
      setFetchTrips(res.data);
      console.log(res.data);
    });
  }, []);

  const openTripDetails = (id) => {
    history.push(`/trip-details/${id}`);
  };

  const addTrip = () => {
    history.push(`/add-trip`);
  };

  return (
    <View>
      <Text>My Trips</Text>
      <View style={{ marginLeft: 80 }}>
        <Text
          className={'tab ' + (tab === 'active' ? 'tab-active' : '')}
          onClick={() => {
            setTab('active');
          }}
        >
          Active
        </Text>
        <Text
          className={'tab ' + (tab === 'upcoming' ? 'tab-active' : '')}
          onClick={() => {
            setTab('upcoming');
          }}
        >
          Upcoming
        </Text>
        <Text
          className={'tab ' + (tab === 'past' ? 'tab-active' : '')}
          onClick={() => {
            setTab('past');
          }}
        >
          Past
        </Text>
      </View>

      <View>
        {fetchTrips
          .filter((fetchTrip) => {
            if (tab === 'active') {
              return (
                new Date(fetchTrip.startDate) <= new Date() &&
                new Date(fetchTrip.endDATE) >= new Date()
              );
            }
          })
          .slice(0, 1)
          .map((fetchTrip) => {
            return (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'columnReverse',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={fetchTrip.photo}
                  style={{
                    cursor: 'pointer',
                    borderRadius: 10,
                    width: 330,
                    height: 230,
                    objectFit: 'cover',
                  }}
                  alt='random'
                ></Image>
                <View
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    top: 200,
                    left: 40,
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  {moment(fetchTrip.startDate).format('MMM Do')} -
                  {moment(fetchTrip.endDATE).format('MMM Do')}
                </View>
                <View style={{ display: 'flex', margin: 10 }}>
                  <Text
                    style={{
                      display: 'flex',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 25,
                      position: 'absolute',
                      top: 25,
                      left: 40,
                    }}
                  >
                    {fetchTrip.title}
                  </Text>
                  <View
                    onClick={() => openTripDetails(fetchTrip.id)}
                    style={{
                      marginLeft: 12,
                      width: 20,
                      display: 'flex',
                      position: 'absolute',
                      top: 190,
                      right: 40,
                    }}
                  />
                </View>

                <Text
                  style={{
                    textAlign: 'left',
                    marginLeft: 20,
                    fontSize: 20,
                    fontWeight: 'bolder',
                    color: '#38516d',
                  }}
                >
                  Active
                </Text>
              </View>
            );
          })}
        {fetchTrips
          .filter((fetchTrip) => {
            if (tab === 'upcoming') {
              return Date.parse(fetchTrip.endDATE) > Date.parse(new Date());
            }
          })
          .slice(0, 1)
          .map((fetchTrip) => {
            return (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'columnReverse',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={fetchTrip.photo}
                  style={{
                    cursor: 'pointer',
                    borderRadius: 10,
                    width: 330,
                    height: 230,
                    objectFit: 'cover',
                  }}
                  alt='random'
                ></Image>
                <View
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    top: 200,
                    left: 40,
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  {moment(fetchTrip.startDate).format('MMM Do')}{' '}
                  <View> - </View>
                  {moment(fetchTrip.endDATE).format('MMM Do')}
                </View>
                <View style={{ display: 'flex', margin: 10 }}>
                  <View
                    style={{
                      display: 'flex',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 25,
                      position: 'absolute',
                      top: 25,
                      left: 40,
                    }}
                  >
                    {fetchTrip.title}
                  </View>
                  <View
                    onClick={() => openTripDetails(fetchTrip.id)}
                    style={{
                      marginLeft: 12,
                      width: 20,
                      display: 'flex',
                      position: 'absolute',
                      top: 190,
                      right: 40,
                    }}
                  />
                </View>

                <Text
                  style={{
                    textAlign: 'left',
                    marginLeft: 20,
                    fontSize: 20,
                    fontWeight: 'bolder',
                    color: '#38516d',
                  }}
                >
                  Upcoming
                </Text>
              </View>
            );
          })}
        {fetchTrips
          .filter((fetchTrip) => {
            if (tab === 'past') {
              return Date.parse(fetchTrip.endDATE) < Date.parse(new Date());
            }
          })
          .slice(0, 1)
          .map((fetchTrip) => {
            return (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'columnReverse',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={fetchTrip.photo}
                  style={{
                    cursor: 'pointer',
                    borderRadius: 10,
                    width: 330,
                    height: 230,
                    objectFit: 'cover',
                  }}
                  alt='random'
                ></Image>
                <View
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    top: 200,
                    left: 40,
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  {moment(fetchTrip.startDate).format('MMM Do')}
                  <View> - </View>
                  {moment(fetchTrip.endDATE).format('MMM Do')}
                </View>
                <View style={{ display: 'flex', margin: 10 }}>
                  <View
                    style={{
                      display: 'flex',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 25,
                      position: 'absolute',
                      top: 25,
                      left: 40,
                    }}
                  >
                    {fetchTrip.title}
                  </View>

                  <View
                    onClick={() => openTripDetails(fetchTrip.id)}
                    style={{
                      marginLeft: 12,
                      width: 20,
                      display: 'flex',
                      position: 'absolute',
                      top: 190,
                      right: 40,
                    }}
                  />
                </View>

                <Text
                  style={{
                    textAlign: 'left',
                    marginLeft: 20,
                    fontSize: 20,
                    fontWeight: 'bolder',
                    color: '#38516d',
                  }}
                >
                  Past
                </Text>
              </View>
            );
          })}
        <View
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {fetchTrips
            .filter((fetchTrip) => {
              if (tab === 'active') {
                return (
                  Date.parse(fetchTrip.startDate) <= Date.parse(new Date()) &&
                  Date.parse(fetchTrip.endDATE) >= Date.parse(new Date())
                );
              }
            })
            .slice(1)
            .map((fetchTrip) => {
              return (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'columnReverse',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      color: rgb(100, 99, 99),
                      marginLeft: 20,
                      fontSize: 13,
                    }}
                  >
                    {moment(fetchTrip.startDate).format('MMM Do')}{' '}
                    <View> - </View>
                    {moment(fetchTrip.endDATE).format('MMM Do')}
                  </View>
                  <View
                    style={{ flexDirection: 'columnReverse', marginTop: 30 }}
                  >
                    <Image
                      src={fetchTrip.photo}
                      style={{
                        backgroundRepeat: 'noRepeat',
                        height: 90,
                        width: 210,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flexStart',
                        cursor: 'pointer',
                        margin: 10,
                        marginLeft: 20,
                        borderRadius: 10,
                        objectFit: 'cover',
                      }}
                      alt='random'
                      onClick={() => openTripDetails(fetchTrip.id)}
                    ></Image>
                    <View
                      style={{
                        color: 'black',
                        marginLeft: 30,
                        marginRight: 20,
                        alignSelf: 'center',
                      }}
                    >
                      {fetchTrip.title}
                    </View>
                  </View>
                </View>
              );
            })}
        </View>

        <View
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {fetchTrips
            .filter((fetchTrip) => {
              if (tab === 'upcoming') {
                return Date.parse(fetchTrip.endDATE) > Date.parse(new Date());
              }
            })
            .slice(1)
            .map((fetchTrip) => {
              return (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'columnReverse',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      color: rgb(100, 99, 99),
                      marginLeft: 20,
                      fontSize: 13,
                    }}
                  >
                    {moment(fetchTrip.startDate).format('MMM Do')}{' '}
                    <View> - </View>
                    {moment(fetchTrip.endDATE).format('MMM Do')}
                  </View>
                  <View
                    style={{ flexDirection: 'columnReverse', marginTop: 30 }}
                  >
                    <Image
                      src={fetchTrip.photo}
                      style={{
                        backgroundRepeat: 'noRepeat',
                        height: 90,
                        width: 210,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flexStart',
                        cursor: 'pointer',
                        margin: 10,
                        marginLeft: 20,
                        borderRadius: 10,
                        objectFit: 'cover',
                      }}
                      alt='random'
                      onClick={() => openTripDetails(fetchTrip.id)}
                    ></Image>
                    <View
                      style={{
                        color: 'black',
                        marginLeft: 30,
                        marginRight: 20,
                        alignSelf: 'center',
                      }}
                    >
                      {fetchTrip.title}
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
        <View
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {fetchTrips
            .filter((fetchTrip) => {
              if (tab === 'past') {
                return Date.parse(fetchTrip.endDATE) < Date.parse(new Date());
              }
            })
            .slice(1)
            .map((fetchTrip) => {
              return (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'columnReverse',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      color: rgb(100, 99, 99),
                      marginLeft: 20,
                      fontSize: 13,
                    }}
                  >
                    {moment(fetchTrip.startDate).format('MMM Do')}{' '}
                    <View> - </View>
                    {moment(fetchTrip.endDATE).format('MMM Do')}
                  </View>
                  <View
                    style={{ flexDirection: 'columnReverse', marginTop: 30 }}
                  >
                    <Image
                      src={fetchTrip.photo}
                      style={{
                        backgroundRepeat: 'noRepeat',
                        height: 90,
                        width: 210,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flexStart',
                        cursor: 'pointer',
                        margin: 10,
                        marginLeft: 20,
                        borderRadius: 10,
                        objectFit: 'cover',
                      }}
                      alt='random'
                      onClick={() => openTripDetails(fetchTrip.id)}
                    ></Image>
                    <View
                      style={{
                        color: 'black',
                        marginLeft: 30,
                        marginRight: 20,
                        alignSelf: 'center',
                      }}
                    >
                      {fetchTrip.title}
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'flexStart',
          marginLeft: 20,
          marginBottom: 30,
        }}
      >
        <Text onClick={addTrip}>PLUS</Text>
      </View>
    </View>
  );
}
