DROP TABLE favorites, user_comments, user_following, user_info, user_posts, user_skills, user_stats;

CREATE TABLE user_info(
  user_info_id SERIAL PRIMARY KEY,
  user_name VARCHAR(40) NOT NULL,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  email_address VARCHAR(30) NOT NULL,
  user_pw VARCHAR(40) NOT NULL,
  profile_image text,
  signup_date timestamp
  );

CREATE TABLE user_stats(
  user_stats_id SERIAL PRIMARY KEY,
  user_info_id INTEGER NOT NULL REFERENCES user_info(user_info_id),
  total_posts INTEGER NOT NULL,
  total_followers INTEGER NOT NULL,
  total_following INTEGER NOT NULL,
  total_skills INTEGER NOT NULL,
  skill_level INTEGER NOT NULL
  );

CREATE TABLE user_posts(
  user_post_id SERIAL PRIMARY KEY,
  user_info_id INTEGER NOT NULL REFERENCES user_info(user_info_id),
  post_image TEXT NOT NULL,
  post_date timestamp NOT NULL,
  post_caption VARCHAR(255)
);

CREATE TABLE favorites(
  favorites_id SERIAL PRIMARY KEY,
  user_info_id INTEGER NOT NULL REFERENCES user_info(user_info_id),
  user_post_id INTEGER NOT NULL REFERENCES user_posts(user_post_id)
);

CREATE TABLE user_comments(
  comment_id SERIAL PRIMARY KEY,
  user_post_id INTEGER NOT NULL REFERENCES user_posts(user_post_id),
  user_info_id INTEGER NOT NULL REFERENCES user_info(user_info_id),
  comment_text VARCHAR(255),
  comment_date timestamp
);

CREATE TABLE user_following(
  following_id SERIAL PRIMARY KEY,
  user_info_id INTEGER NOT NULL REFERENCES user_info(user_info_id),
  followed_user_info_id INTEGER NOT NULL REFERENCES user_info(user_info_id)
);

CREATE TABLE user_skills(
  user_skills_id SERIAL PRIMARY KEY,
  user_info_id INTEGER NOT NULL REFERENCES user_info(user_info_id),
  skill_image TEXT,
  skill_date timestamp,
  skill_caption VARCHAR(255),
  skill_name VARCHAR(20),
  skill_progression VARCHAR(20)
);