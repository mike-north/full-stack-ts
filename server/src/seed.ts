import Db from './db';

export function seedDb(db: Db) {
  if (db.getAllUsers().length === 0) {
    const [_student,mike, lisa, marc, fem] = [
      db.createUser({
        name: 'Stu Dent',
        handle: 'student',
        avatarUrl: 'https://placehold.it/g/200/200',
      }),
      db.createUser({
        name: 'Mike North',
        handle: 'michaellnorth',
        avatarUrl: 'http://localhost:3000/static/mike-north.png',
      }),
      db.createUser({
        name: 'Lisa Huang-North',
        handle: 'LisaHuangNorth',
        avatarUrl: 'http://localhost:3000/static/lisaychuang.png',
      }),
      db.createUser({
        name: 'Marc Grabanski',
        handle: '1Marc',
        avatarUrl: 'http://localhost:3000/static/1marc.jpeg',
      }),
      db.createUser({
        name: 'Frontend Masters',
        handle: 'FrontendMasters',
        avatarUrl: 'http://localhost:3000/static/fem_logo.png',
      }),
    ];

    const [tweet1, tweet2, tweet3, tweet4] = [
      db.createTweet({
        userId: fem.id,
        message:
          'Hey, check this out! https://www.youtube.com/embed/Q1owo3t6CZ8',
      }),
      db.createTweet({
        userId: marc.id,
        message:
          "Check out Mike's story -- new on the FEM youtube channel! https://www.youtube.com/embed/j02UgcixOU0",
      }),
      db.createTweet({
        userId: lisa.id,
        message:
        "@1Marc I'm having trouble logging into FEM. This is the captcha I'm being asked to solve. Seems a bit challenging http://localhost:3000/static/captcha-1.jpg ",
      }),
      db.createTweet({
        userId: marc.id,
        message:
          `@${lisa.handle} I just deployed a new version of the UI. Mind trying again?`,
      }),
      db.createTweet({
        userId: lisa.id,
        message: `@FrontendMasters I'm still having trouble with the login captchas. Am I supposed to take a class before solving this one? http://localhost:3000/static/captcha-4.jpg`,
      }),
    ];
    db.createFavorite({ userId: fem.id, tweetId: tweet2.id });
    db.createFavorite({ userId: fem.id, tweetId: tweet4.id });
    db.createFavorite({ userId: marc.id, tweetId: tweet2.id });
    db.createFavorite({ userId: marc.id, tweetId: tweet4.id });
    db.createFavorite({ userId: mike.id, tweetId: tweet1.id });
    db.createFavorite({ userId: mike.id, tweetId: tweet3.id });
    db.createFavorite({ userId: mike.id, tweetId: tweet4.id });
    db.createFavorite({ userId: lisa.id, tweetId: tweet2.id });
    db.createFavorite({ userId: lisa.id, tweetId: tweet4.id });
  }
}
