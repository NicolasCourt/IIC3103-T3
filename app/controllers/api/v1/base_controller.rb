require 'uri'
require 'net/http'
require 'openssl'
require 'json'

module Api
  module V1
    class BaseController < ActionController::base
      before_action :set_url

      DEVELOP_URL = ""
      SUB_URL = URI("#{Rails.application.credentials[:subscription][:url]}/#{Rails.application.credentials[:id]}")

      def create_subscription
        http = Net::HTTP.new(SUB_URL.host, SUB_URL.port)
        http.use_ssl = true # if the API uses HTTPS

        request = Net::HTTP::Post.new(SUB_URL)
        request["Content-Type"] = "application/json"
        request.body = { "url" => @url }.to_json

        response = http.request(request)
      end

      def delete_subscription
        http = Net::HTTP.new(SUB_URL.host, SUB_URL.port)
        http.use_ssl = true # Enable SSL/TLS

        request = Net::HTTP::Delete.new(SUB_URL)

        response = http.request(request)
      end

      private

      def set_url
        @url = Rails.env.production? ? Rails.application.credentials[:api][:url] : DEVELOP_URL
      end

    end
  end
end