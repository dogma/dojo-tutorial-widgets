class ApplicationController < ActionController::Base
  protect_from_forgery

  #This sets up up the default output format for data (object etc)
  #returned from the controller.
  respond_to :json, :html
end
