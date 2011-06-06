class Page < ActiveRecord::Base

  def next
    @next_page = Page.find_by_step(self.step+1)
  end

  def prev
    @prev_page = Page.find_by_step(self.step-1)
  end
end
