CREATE FUNCTION add_prof_to_rating() RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO ratings(prof_id) VALUES (NEW.ID);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
