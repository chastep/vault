require 'rails_helper'

RSpec.describe 'Bank Accounts API', type: :request do
  let!(:bank_accounts) { create_list(:bank_account, 5) }

  describe 'GET /bank_accounts' do
    before { get '/api/bank_accounts' }

    it 'returns todos' do
      expect(JSON.parse(response.body)).not_to be_empty
      expect(JSON.parse(response.body).size).to eq(5)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /bank_accounts' do
  end

  describe 'GET /bank_accounts/:id' do
  end

  describe 'PUT /bank_accounts/:id' do
  end

  describe 'DELETE /bank_accounts/:id' do
  end
end
