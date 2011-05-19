class Todo < ActiveRecord::Base
  has_many :notes
end
