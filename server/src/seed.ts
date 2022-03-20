import Db from './db';

export function seedDb(db: Db) {
  const me = db.createUser({
    name: 'Mike North',
    handle: 'michaellnorth',
    avatarUrl: 'http://placecorgi.com/300/300',
  });
  if (db.getAllTweets().length === 0) {
    const firstTweets = [
      db.createTweet({
        userId: me.id,
        message: "Hello world! I'm a tweet!",
      }),
      db.createTweet({
        userId: me.id,
        message: "Hello world! I'm another tweet!",
      }),
    ];
    console.log('created first tweets', firstTweets);
  }
}
