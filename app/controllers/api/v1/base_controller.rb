# frozen_string_literal: true
require 'uri'
require 'net/http'
require 'openssl'
require 'json'
require 'httparty'

module Api
  module V1
    class BaseController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :set_url, except: [:status_subscription]

      def create_subscription
        url = "#{Rails.application.credentials[:subscription][:url]}/#{Rails.application.credentials[:id]}"
        response = HTTParty.post(url, 
                         body: { "url": @url }.to_json, 
                         headers: { "Content-Type" => "application/json" }, 
                         verify: true) # enable SSL verification, set to false to disable
        
        Rails.cache.write("subscription", "active") if response.code == 200
        return render json: JSON.parse(response.body), status: response.code
      end

      def delete_subscription
        url = "#{Rails.application.credentials[:subscription][:url]}/#{Rails.application.credentials[:id]}"
        response = HTTParty.delete(
          url,
          headers: { "Content-Type" => "application/json" }, 
          verify: true)
        Rails.cache.delete("subscription") if response.code == 200
        return render json: JSON.parse(response.body), status: response.code
      end

      def status_subscription
        return render json: { "subscription": Rails.cache.read("subscription") }
      end

      def set_url
        puts Rails.env
        @url = Rails.env.production? ? "#{Rails.application.credentials[:api][:url]}/api/v1/transaction" : "https://ba17-181-43-38-41.ngrok.io/api/v1/transaction"
      end

    end
  end
end