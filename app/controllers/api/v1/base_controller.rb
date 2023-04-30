# frozen_string_literal: true
require 'uri'
require 'net/http'
require 'openssl'
require 'json'

module Api
  module V1
    class BaseController < ActionController::Base
      before_action :set_url, except: [:status_subscription]

      def create_subscription
        Rails.cache.write("subscription", "active")

        url = URI("#{Rails.application.credentials[:subscription][:url]}/#{Rails.application.credentials[:id]}")
        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true # if the API uses HTTPS

        request = Net::HTTP::Post.new(url)
        request["Content-Type"] = "application/json"
        request.body = { "url": @url }.to_json

        response = http.request(request)
        puts response
        return render json: { data: response }, status: :ok
      end

      def delete_subscription
        Rails.cache.delete("subscription")

        url = URI("#{Rails.application.credentials[:subscription][:url]}/#{Rails.application.credentials[:id]}")
        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true # Enable SSL/TLS

        request = Net::HTTP::Delete.new(url)

        response = http.request(request)
        return render json: {data: response}, status: :ok
      end

      def status_subscription
        return render json: { "subscription": Rails.cache.read("subscription") }
      end

      private

      def set_url
        @url = Rails.env.production? ? Rails.application.credentials[:api][:url] : "https://5043-181-43-126-31.ngrok.io"
      end

    end
  end
end