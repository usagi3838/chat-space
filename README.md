## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false,index: true|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :posts
- has_many :groups, through: :group_users
- has_many :group_users

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
|body|text||
|images|string||
### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|text|null: false|
### Association
- has_many :posts
- has_many :users, through: :group_users
- has_many :group_users

## group_userテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user