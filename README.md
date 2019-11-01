## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false , foreign_key: true|
|nickname|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :posts
- has_many :groups, through: :group_user

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|body|text|null: false|
|created_time|integer|null: false|
|updated_time|integer|null: false|
### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|group_name|text|null: false|
### Association
- has_many :posts
- has_many :users, through: :group_user

## group_userテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user