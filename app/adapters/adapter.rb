module Adapter
  class RoutingNumberInfoAdapter
    ROUTING_INFO_URL = 'https://www.routingnumbers.info/api/data.json'.freeze
    attr_reader :client

    def initialize
      @client = Faraday.new(url: ROUTING_INFO_URL) do |conn|
        conn.request :json
        conn.response :json, content_type: /\bjson$/, parser_options: { symbolize_names: true }
        conn.headers['Content-Type'] = 'application/json'
        conn.adapter Faraday.default_adapter
      end
    end

    def lookup(num)
      response = @client.get("?rn=#{num}")
      response.body[:routing_number]
    end
  end
end
