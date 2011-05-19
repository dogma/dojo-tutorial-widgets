class TutorialStepIndex < ActiveRecord::Migration
  def self.up
    add_index :pages, [:tutorial, :step], :unique=>true, :name=>"tutorial_steps"

  end

  def self.down
    remove_index :pages, "tutorial_steps"
  end
end
