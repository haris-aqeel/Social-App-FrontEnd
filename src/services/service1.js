const fetchUsersData = async () => {


  const usersData = await fetch(
    "http://cors-anywhere.herokuapp.com/https://smallsocialappbackend.herokuapp.com/userData"
  );
  const getData = await fetch(
    "http://cors-anywhere.herokuapp.com/https://smallsocialappbackend.herokuapp.com/userPosts"
  );
  const resultUsersData = await usersData.json();
  const resultgetData = await getData.json();

  var data = [];

  for (var i = 0; i < resultUsersData.length; i++) {
    for (var j = 0; j < resultgetData.length; j++) {
      if (resultUsersData[i]._id === resultgetData[j].personalId) {
        data = [...data,{
          ...resultUsersData[i],
          ...resultgetData[j],
        }]
      }
    }
  };
  return data;
};


export default fetchUsersData;
