CREATE FUNCTION add_prof_to_rating() RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO ratings(prof_id) VALUES (NEW.ID);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION calc_prof_avg() RETURNS TRIGGER AS
$$
DECLARE
    avg1 numeric(3,2);
    avg2 numeric(3,2);
    avg3 numeric(3,2);
    avg4 numeric(3,2);
BEGIN
    avg1 := (SELECT AVG(feature_1) from comments where prof_id = NEW.prof_id);
    avg2 := (SELECT AVG(feature_2) from comments where prof_id = NEW.prof_id);
    avg3 := (SELECT AVG(feature_3) from comments where prof_id = NEW.prof_id);
    avg4 := (SELECT AVG(feature_4) from comments where prof_id = NEW.prof_id);
    UPDATE ratings
        SET feature_1 = avg1,
            feature_2 = avg2,
            feature_3 = avg3,
            feature_4 = avg4
        WHERE prof_id = NEW.prof_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;