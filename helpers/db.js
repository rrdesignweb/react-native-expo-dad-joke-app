import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("favJokes.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS favJokes (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL);",
        [],
        () => {
          //success
          console.log("success")
          resolve();
        },
        (_, err) => {
          //fail
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertFavJokeDB = (title) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO favJokes(title) VALUES(?);",
        [title],
        (_, result) => {
          //success
          resolve(result);
        },
        (_, err) => {
          //fail
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteFavJokeDB = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "DELETE FROM favJokes WHERE id = ?;",
        [id],
        (_, result) => {
          //success
          resolve(result);
        },
        (_, err) => {
          //fail
          reject(err);
          console.log("fail delete");
        }
      );
    });
  });
  return promise;
};

export const fetchFavJokesDB = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM favJokes",
        [],
        (_, result) => {
          //success
          resolve(result);
        },
        (_, err) => {
          //fail
          reject(err);
        }
      );
    });
  });
  return promise;
};