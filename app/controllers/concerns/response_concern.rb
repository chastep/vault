module ResponseConcern  
  def json_response(object, status = :ok)
    render json: object, status: status
  end

  def validation_errors
    json_response({ message: @bank_acct.errors.full_messages }, :unprocessable_entity)
  end

  def bank_account_payload(record)
    {
      id: record.id,
      account_number: record.account_number,
      routing_number: record.routing_number,
      nickname: record.nickname,
      location_id: record.location.id,
      address: record.location.address,
      address2: record.location.address2,
      city: record.location.city,
      region: record.location.region,
      postal: record.location.postal,
      created_at: record.created_at,
      updated_at: record.updated_at
    }
  end
end
