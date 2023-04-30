class SiteController < ApplicationController
  layout :resolve_layout
  
  def index
  end

  private

  def resolve_layout
    case action_name
    when 'index'
      'application'
    end
  end

end
