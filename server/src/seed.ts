import Db from './db';

export function seedDb(db: Db) {
  if (db.getAllUsers().length === 0) {
    const [firstUser, secondUser] = [
      db.createUser({
        name: 'Mike North',
        handle: 'michaellnorth',
        avatarUrl: 'http://placecorgi.com/300/300.jpg',
      }),
      db.createUser({
        name: 'Lisa Huang-North',
        handle: 'LisaHuangNorth',
        avatarUrl: 'http://placecorgi.com/600/600.jpg',
      }),
    ];

    const [tweet1, tweet2, tweet3, tweet4] = [
      db.createTweet({
        userId: firstUser.id,
        message: "Hey, check this out! https://www.youtube.com/embed/Q1owo3t6CZ8",
      }),
      db.createTweet({
        userId: firstUser.id,
        message: "Here's my story! https://www.youtube.com/embed/j02UgcixOU0",
      }),
      db.createTweet({
        userId: secondUser.id,
        message: 'I like corgies http://placecorgi.com/800/600.jpg',
      }),
      db.createTweet({
        userId: secondUser.id,
        message: 'I REALLY like corgies http://placecorgi.com/700/600.jpg',
      }),
    ];
    db.createFavorite({ userId: firstUser.id, tweetId: tweet1.id });
    db.createFavorite({ userId: firstUser.id, tweetId: tweet3.id });
    db.createFavorite({ userId: firstUser.id, tweetId: tweet4.id });
    db.createFavorite({ userId: secondUser.id, tweetId: tweet2.id });
    db.createFavorite({ userId: secondUser.id, tweetId: tweet4.id });

  }
}
