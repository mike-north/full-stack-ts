import Db from './db';

export function seedDb(db: Db) {
  if (db.getAllTrends().length === 0) {
    db.createHashtagTrend({ hashtag: 'typescript', tweetCount: 9001 });
    db.createTopicTrend(
      { topic: 'Frontend Masters', tweetCount: 12345 },
      {
        description: 'Launch of new full stack TS course',
        imageUrl: 'http://localhost:3000/static/fem_logo.png',
        title: 'Frontend Masters',
      }
    );
    db.createTopicTrend(
      { topic: 'Pointless Suggestions', tweetCount: 999 },
      {
        description: "It looks like you're trying to write a letter...",
        imageUrl: 'http://localhost:3000/static/clippy-logo.jpeg',
        title: 'clippy',
      }
    );
    db.write();
  }
  if (db.getAllSuggestions().length === 0) {
    db.createSuggestion({
      name: 'TypeScript Project',
      handle: 'TypeScript',
      avatarUrl: 'http://localhost:3000/static/ts-logo.png',
      reason: 'Because you follow @MichaelLNorth',
    });
    db.createSuggestion({
      name: 'jQuery',
      handle: 'jquery',
      avatarUrl: 'http://localhost:3000/static/jquery-logo.jpeg',
      reason: 'Because you follow @FrontendMasters',
    });
    db.createSuggestion({
      name: 'GitHub',
      handle: 'github',
      avatarUrl: 'http://localhost:3000/static/github-logo.jpeg',
      reason: 'Because you follow @MichaelLNorth',
    });
    db.createSuggestion({
      name: 'Microsoft',
      handle: 'ms',
      avatarUrl: 'http://localhost:3000/static/msft-logo.png',
      reason: 'Because you follow @lisaychuang',
    });
    db.write();
  }
  if (db.getAllUsers().length === 0) {
    const [_student, mike, lisa, marc, fem] = [
      db.createUser({
        name: 'Stu Dent',
        handle: 'student',
        avatarUrl: 'http://localhost:3000/static/egg.jpeg',
        coverUrl: 'http://localhost:3000/static/beach.jpeg',
      }),
      db.createUser({
        name: 'Mike North',
        handle: 'michaellnorth',
        avatarUrl: 'http://localhost:3000/static/mike-north.png',
        coverUrl: 'http://localhost:3000/static/beach.jpeg',
      }),
      db.createUser({
        name: 'Lisa Huang-North',
        handle: 'LisaHuangNorth',
        avatarUrl: 'http://localhost:3000/static/lisaychuang.png',
        coverUrl: 'http://localhost:3000/static/beach.jpeg',
      }),
      db.createUser({
        name: 'Marc Grabanski',
        handle: '1Marc',
        avatarUrl: 'http://localhost:3000/static/1marc.jpeg',
        coverUrl: 'http://localhost:3000/static/beach.jpeg',
      }),
      db.createUser({
        name: 'Frontend Masters',
        handle: 'FrontendMasters',
        avatarUrl: 'http://localhost:3000/static/fem_logo.png',
        coverUrl: 'http://localhost:3000/static/beach.jpeg',
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
        message: `@${lisa.handle} I just deployed a new version of the UI. Mind trying again?`,
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
