import Db from './db';

export function seedDb(db: Db) {
  if (db.getAllUsers().length === 0) {
    const [firstUser, secondUser] = [
      db.createUser({
        name: 'Mike North',
        handle: 'michaellnorth',
        avatarUrl: 'http://placecorgi.com/300/300',
      }),
      db.createUser({
        name: 'Lisa Huang-North',
        handle: 'LisaHuangNorth',
        avatarUrl: 'http://placecorgi.com/600/600',
      }),
    ];

    const [tweet1, tweet2, tweet3, tweet4] = [
      db.createTweet({
        userId: firstUser.id,
        message: "Hello world! I'm a tweet!",
      }),
      db.createTweet({
        userId: firstUser.id,
        message: "Hello world! I'm another tweet!",
      }),
      db.createTweet({
        userId: secondUser.id,
        message: 'I like corgies http://placecorgi.com/800/600',
      }),
      db.createTweet({
        userId: secondUser.id,
        message: 'I REALLY like corgies http://placecorgi.com/800/600',
      }),
    ];
    db.createFavorite({ userId: firstUser.id, tweetId: tweet1.id });
    db.createFavorite({ userId: firstUser.id, tweetId: tweet3.id });
    db.createFavorite({ userId: firstUser.id, tweetId: tweet4.id });
    db.createFavorite({ userId: secondUser.id, tweetId: tweet2.id });
    db.createFavorite({ userId: secondUser.id, tweetId: tweet4.id });

  }
}
